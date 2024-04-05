# Tikal Wrapper

## Setup

Example commands are for MacOS

1. Ensure JDK is installed. `brew install openjdk && sudo ln -sfn $HOMEBREW_PREFIX/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk`
2. Set `$JAVA_HOME`. `export JAVA_HOME=/Library/Java/JavaVirtualMachines/openjdk.jdk/Contents/Home`
3. Extract the `lib` folder from [okapi-lib_all-platforms_1.46.0.zip](https://okapiframework.org/binaries/main/1.46.0/okapi-lib_all-platforms_1.46.0.zip) and put it in `vendor/tikal`
4. `pnpm install`
5. `pnpm run dev`
