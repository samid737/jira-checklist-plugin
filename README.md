# JIRA Cloud checklist plugin

Plain and simple check/todo list plugin using [atlassian-connect-express](https://bitbucket.org/atlassian/atlassian-connect-express/src/master/).
Data persistence is achieved via [entity properties](https://developer.atlassian.com/cloud/jira/software/jira-entity-properties/).

Preview:

![Demo](https://media.giphy.com/media/Zv8NMNSxRrgS5zJ7qj/giphy.gif)

## Usage

* Enable [development mode](https://developers.atlassian.com/cloud/jira/platform/getting-started/) for your JIRA instance.

* use [ngrok](https://ngrok.com/) for tunneling your local application: 
``` npm install --save-dev ngrok@2 ```
* a valid credentials.json file for auto (de)registration as found [here](https://bitbucket.org/atlassian/atlassian-connect-express-template/src/master/credentials.json.sample).

* install dependencies:

``` npm install ```

* to register and test the add-on :

``` npm start ```

This will install your plugin ready for use.

* Flood fill your issues with TODOs.

## Dev notes

* plugin is not actively maintained!

* Atlassian-connect-express manages auto registration and deregistration of your add-on.For details, please refer to [atlassian-connect-express README](https://bitbucket.org/atlassian/atlassian-connect-express/src/master/). For manual deployment, please refer to the [getting started](https://developers.atlassian.com/cloud/jira/platform/getting-started/)

* The plugin replaces the deprecated [juggling-db](https://github.com/1602/jugglingdb) in favor of [sequalize](http://docs.sequelizejs.com/) [according to recent release](https://bitbucket.org/atlassian/atlassian-connect-express/src/master/RELEASENOTES.md).

* If you have any problems with usage or installation, feel free to email me.
