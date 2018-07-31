/* add-on script */
// Addon functionality

//setup input events
var list = {
    init: function () {
        $("#description-input").on('keyup', function (e) {
            if (e.keyCode == 13) {
                $('#create-button').click();
            }
        });

        $('#create-button').click(list.add);

        $("#description-input").focus(function () {
            $(this).val('');
        });

        $('#todo-list').sortable({
            stop: list.update
        });

        list.refresh();
    },
    get: {
        //fetch data properties
        todo: function () {
            var todo = {};

            $("li").each(function (e, f) {
                var chk = f.children[0].checked;
                var txt = f.children[1].innerHTML;
                todo[txt] = chk;
            });

            return { todos: todo };
        },
        issue: function () {
            return $('#todos-issue-key').val();
        }
    },
    add: function () {
        var data = list.get.todo();

        var entry = $('#description-input').val();
        $('#description-input').val("");

        data.todos[entry] = false;

        api.request(data, list.refresh, api.err);
    },
    remove: function (todo) {
        var data = list.get.todo();

        delete data.todos[todo];

        api.request(data, list.refresh, api.err);
    },
    update: function () {
        var data = list.get.todo();

        api.request(data, list.refresh, api.err);
    },
    refresh: function () {

        var onSucces = function (response) {
            var res = JSON.parse(response);
            //console.log(res);
            list.generate(res.value.todos, "#todo-list");
        }

        var onError = function (response) {
            list.generate([], "#todo-list");
        }

        api.request(null, onSucces, onError);

    },
    generate: function (todos, selector) {
        var root = $(selector);
        root.html("");

        console.log(todos);
        //use jquery to build html
        for (todo in todos) {
            var li = $("<li/>");
            li.append($("<input/>", { "type": "checkbox", "checked": todos[todo], "click": function () { list.update() } }));
            li.append($("<span/>", { "class": "description", "html": todo }));
            li.append($("<span/>", { "class": "aui-icon aui-icon-small aui-iconfont-close-dialog", "html": "&#10006", "click": function () { list.remove(todo) } }));
            root.append(li);
        }
    },
}

//The interface, helper methods
var api = {
    request: function (data, onSucces, onError) {

        var issueURL = '/rest/api/2/issue/' + list.get.issue() + '/properties/todos';

        var params = {
            url: issueURL,
            contentType: "application/json",
            success: onSucces,
            error: onError,
        };

        if (data) {
            params["data"] = JSON.stringify(data);
            params["type"] = "PUT";
        }
        //The actual request towards atlassian
        AP.require(['request'], function (request) {
            request(params);
        });
    },

    err: function (response) {
        console.error("Error loading API" + response.status);
    }
}

list.init();
