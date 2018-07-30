# JIRA Cloud checklist plugin

Plain and simple check/todo list plugin using [atlassian-connect-express](https://bitbucket.org/atlassian/atlassian-connect-express/src/master/) as the web service framework.

Preview:

![Demo](https://gph.is/2mSPbS6)

## Usage

### Requirements

* Enable [development mode](https://developers.atlassian.com/cloud/jira/platform/getting-started/) for your JIRA instance.

* use [ngrok](https://ngrok.com/) for tunneling your local application: 
``` npm install --save-dev ngrok@2 ```
* a valid credentials.json file for auto (de)registration as found [here](https://bitbucket.org/atlassian/atlassian-connect-express-template/src/master/credentials.json.sample).

install dependencies:

``` npm install ```

 to register and test the add-on :

``` npm start ```

This will install your plugin ready for use.

Now browse your issues and TODO everything you can imagine.

## Dev notes

* Atlassian-connect-express manages auto registration and deregistration of your add-on.For details, please refer to [atlassian-connect-express README](https://bitbucket.org/atlassian/atlassian-connect-express/src/master/). For manual deployment, please refer to the [getting started](https://developers.atlassian.com/cloud/jira/platform/getting-started/)

* The plugin replaces the deprecated [juggling-db](https://github.com/1602/jugglingdb) in favor of [sequalize](http://docs.sequelizejs.com/) [according to recent release](https://bitbucket.org/atlassian/atlassian-connect-express/src/master/RELEASENOTES.md).

* Handlebars.js will probably be replaced later on.

* App under development. Contributions are welcome.

* If you have any problems with usage or installation, feel free to email me.
