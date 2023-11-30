#!/bin/bash -e

die() {
	printf '%s\n' "$*" >&2
	exit 1
}

DIR="$(dirname "$0")"

DRY=-n

[ "$#" -le 1 ] || die "Extra arguments not supported"

if [ "$#" -eq 1 ] ; then
	case "$1" in
		force|f)
			DRY=
			;;
		*)
			die "Unknown argument. Only 'force' allowed"
			;;
	esac
fi

rsync \
	"$DIR/src/"  \
	-rav \
	--delete \
	--exclude=sass \
	--progress \
	$DRY \
	anastasia-hosting:html/anastasia.tynq.net/portfolio/

