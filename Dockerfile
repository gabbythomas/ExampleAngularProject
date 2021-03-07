# There are base images with node that exist already,
# but just to show the app is being built/executed on the assigned distro,
# let's just start from that base distro image.
FROM ubuntu:16.04 AS app-env

RUN apt-get update \
  && apt-get install -y curl sudo

# Install nodeJS
RUN curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash \
  && apt-get install -y nodejs \
  && apt-get clean

# Install Angular CLI and configure to use yarn
# - note that npm will error out if we try to install in root,
# so move to a new directory first
WORKDIR /build

RUN npm install -g yarn \
  && yarn global add @angular/cli \
  && ng config -g cli.packageManager yarn \
  && npm cache clean --force \
  && yarn cache clean --force

FROM app-env AS app-build

COPY . /build
WORKDIR /build

# Create release build
RUN yarn install --pure-lockfile --no-cache
RUN ng build --configuration=production

FROM app-env AS app-run

# Run with only minimum set of files needed
COPY --from=app-build /build/dist /app
WORKDIR /app

#ENTRYPOINT ["ng", "serve"]