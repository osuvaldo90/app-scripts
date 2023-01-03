#!/bin/sh

project_dir=$1

if [[ -z $project_dir ]]; then
  echo "usage: $0 <project directory>"
  echo "git must be installed"
  echo "nvm must be installed at $HOME/.nvm/nvm.sh"
  exit 1
fi

start_dir=$(pwd)
mkdir -p $project_dir
cd $project_dir
rm -rf ./* ./.*

. ~/.nvm/nvm.sh
nvm install 19

npx create-next-app@latest . --ts

node -v > .nvmrc
node $start_dir/react-app/configure-tsconfig.mjs
git add .
git commit -am "Setup .npmrc and tsconfig.json"

npm install --save-dev eslint-plugin-import eslint-plugin-react-hooks eslint-plugin-unused-imports
node $start_dir/react-app/configure-eslint.mjs
npx eslint --fix .
git add .
git commit -m "Configure and run ESLint"

npm install --save-dev prettier
cp $start_dir/react-app/prettierrc.json ./.prettierrc.json
npx prettier -w .
git add .
git commit -m "Install, configure, and run Prettier"

cd $start_dir
