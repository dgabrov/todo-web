#!/bin/bash
image_name=node:12.21.0-alpine3.10

echo docker run \
    -v /home/dgabrov/IdeaProjects/todo-2-react/application:/application \
    -w "/application" \
    -u "$(id -u):$(id -g)" \
    ${image_name} \
    /bin/sh -c "npm install && npm run build"

