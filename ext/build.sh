# combine files for the $1 build (chrome/firefox)
build() {
  rm -rf "./build/$1"
  mkdir -p "./build/$1"

  cp -r $(git ls-files --others --exclude-standard :\(glob\)$1/\* :\(glob\)common/\*) "./build/$1/"

  echo "Built $1 (./build/$1)"
}

# package into zip
package() {
  rm -f "./build/$1.zip"
  (cd "./build/$1"; zip -r "../$1.zip" ".")

  echo "Packaged ./build/$1 into ./build/$1.zip"
}

case $1 in
  build)
    build $2
    ;;
  package)
    build $2
    package $2
    ;;
  *)
    echo "USAGE: build.sh <build|package> <chrome|firefox>"
    exit 1
esac
