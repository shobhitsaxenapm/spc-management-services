#!/bin/sh
set -eu
cd "$(dirname "$0")"
umask 077
if [ -d /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home ]; then
  export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
  export PATH="$JAVA_HOME/bin:$PATH"
fi
if [ ! -f target/website-forms-1.0.0.jar ]; then
  mvn -B package
fi
exec java -jar target/website-forms-1.0.0.jar
