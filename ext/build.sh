# list non ignored files/dirs in directory $1
list_files() {
  pushd $1 > /dev/null
  # oc == others and cached
  # exclude-standard == exclude ignored files
  # sed/uniq to get directories
  # https://stackoverflow.com/a/10456380
  git ls-files --exclude-standard -oc . | sed s,/.*,/, | uniq | sed "s,^,$1/,"
  popd > /dev/null
}

# combine files for the $1 build (chrome/firefox)
build() {
  rm -rf "./build/$1"
  mkdir -p "./build/$1"

  cp -r $(list_files $1) $(list_files common) "./build/$1/"

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
