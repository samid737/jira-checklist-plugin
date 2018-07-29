/* add-on script */
// Addon functionality

//setup input events
$(function () {
    list.init();
});

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
        //strip d3 later on
        data: function () {
            var data = {};

            $("li").each(function (e, f) {
                var chk = f.children[0].checked;
                var txt = f.children[1].innerHTML;
                data[txt] = chk;
            });

            console.log(data)
            console.log(JSON.stringify(data));
            return  data;
        },
        issue: function () {
            return $('#todos-issue-key').val();
        }
    },
    add: function () {
        var entry = $('#description-input').val();
        $('#description-input').val("");

        var data = list.get.data();
        var newData = { todos: data };
        data[entry] = false;
        console.log(data);
        //newData.todos.push(entry); 
        newData = JSON.stringify(newData);

        api.request(newData, list.refresh, api.err);
    },
    remove: function (todo) {

        var data = list.get.data();
        var newData = { todos: data };
        delete newData.todos[todo];
        console.log(newData);

        newData = JSON.stringify(newData);

        api.request(newData, list.refresh, api.err);
    },
    clear: function () {
        //TODO: add clear function
    },
    update: function () {
        var data = list.get.data();
        var newData = { todos: data };
        newData = JSON.stringify(newData);

        api.request(newData, list.refresh, api.err);
    },
    refresh: function () {

        var onSucces = function (response) {
            var res = JSON.parse(response);
            console.log(res);
            //console.log(res);
            list.generate(res.value.todos, "#todo-list");
        }

        var onError = function (response) {
            list.generate([], "#todo-list");
        }

        api.request(null, onSucces, onError);

    },
    generate: function (todos, selector) {
        console.log(todos);
        var root = $(selector);
        root.html("");

        for(todo in todos){
            var li = document.createElement("li");
            root.append(li);

            //rewrite dom
            var inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            console.log(inp);
            inp.checked = todos[todo];
            console.log(todos[todo]);
            var txt = document.createElement("span");
            txt.setAttribute("class", "description");
            txt.innerHTML = todo;
            var cl = document.createElement("span");
            cl.setAttribute("class", "aui-icon aui-icon-small aui-iconfont-close-dialog")
            cl.innerHTML = "&#10006";
            cl.txt = todo;
            cl.onclick = function(){list.remove(cl.txt)};
            inp.onclick = function(){list.update()};

            li.appendChild(inp);
            li.appendChild(txt);
            li.appendChild(cl);
            console.log(li);

            console.log(root);

        }


    },
}

//The interface, helper methods
var api = {
    request: function (data, onSucces, onError) {

        var issueKey = '/rest/api/2/issue/' + list.get.issue() + '/properties/todos';

        var params = {
            url: issueKey,
            contentType: "application/json",
            success: onSucces,
            error: onError,
        };

        if (data) {
            params["data"] = data;
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
