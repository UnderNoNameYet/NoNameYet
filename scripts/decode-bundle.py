#!/usr/bin/env python3
"""Decode split Base64 bundles and verify their exact SHA-256 digest.

The product overlay was transferred as 6,000-character text chunks. One
character is missing from the first remote chunk. When requested, this tool
recovers that character using the known archive SHA-256 rather than accepting
an unverified repair.
"""
from __future__ import annotations

import argparse
import base64
import binascii
import hashlib
import pathlib
import re
import sys

ALPHABET = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"


def cleaned(path: pathlib.Path) -> bytes:
    data = path.read_bytes()
    return re.sub(rb"[^A-Za-z0-9+/=]", b"", data)


def decode(data: bytes) -> bytes | None:
    padded = data + (b"=" * ((-len(data)) % 4))
    try:
        return base64.b64decode(padded, validate=True)
    except (binascii.Error, ValueError):
        return None


def digest(data: bytes | None) -> str | None:
    return hashlib.sha256(data).hexdigest() if data is not None else None


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", required=True)
    parser.add_argument("--sha", required=True)
    parser.add_argument("--repair-one-missing-in-first", action="store_true")
    parser.add_argument("parts", nargs="+")
    args = parser.parse_args()

    paths = [pathlib.Path(p) for p in args.parts]
    chunks = [cleaned(p) for p in paths]
    combined = b"".join(chunks)
    result = decode(combined)

    if digest(result) == args.sha:
        pathlib.Path(args.output).write_bytes(result)
        print(f"{args.output}: OK ({args.sha})")
        return 0

    if not args.repair_one_missing_in_first:
        print(
            f"{args.output}: checksum mismatch; got {digest(result) or 'invalid Base64'}, expected {args.sha}",
            file=sys.stderr,
        )
        return 1

    first, tail = chunks[0], b"".join(chunks[1:])
    print(
        f"{args.output}: first chunk has {len(first)} Base64 characters; attempting one-character verified recovery",
        flush=True,
    )

    # The chunks were split at a 6,000-character boundary, so test that
    # boundary first. This resolves the known transfer truncation quickly.
    positions = [len(first), *range(len(first))]
    for count, pos in enumerate(positions):
        prefix, suffix = first[:pos], first[pos:]
        for char in ALPHABET:
            candidate = prefix + bytes((char,)) + suffix + tail
            decoded = decode(candidate)
            if digest(decoded) == args.sha:
                pathlib.Path(args.output).write_bytes(decoded)
                printable = chr(char)
                print(
                    f"{args.output}: recovered missing Base64 character {printable!r} at first-chunk offset {pos}; checksum OK"
                )
                return 0
        if count and count % 500 == 0:
            print(f"{args.output}: checked {count} candidate offsets...", flush=True)

    print(
        f"{args.output}: unable to recover a one-character omission with expected checksum {args.sha}",
        file=sys.stderr,
    )
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
