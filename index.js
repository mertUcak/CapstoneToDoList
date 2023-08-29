import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const todos = [];
const todosWork = [];
const monthArray =["January","February","March","April","May","June","July",
"August","September","October","November","December"];


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {

    const day = new Date().getDay();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const monthName = monthArray[month];


    res.render("index.ejs", {
        todayDay: day,
        thisMonth: monthName,
        thisYear: year,
        data: todos,
    });
});

app.post("/", (req, res) => {
    const inputTodoTask = req.body.todoTask.trim(); 

    if (inputTodoTask !== "") { 
        todos.push({
            todoTask: inputTodoTask
        });
    }

    res.redirect("/");
});

app.get("/work", (req, res) => {

    res.render("work.ejs", {
        dataWorks: todosWork
    });
});

app.post("/work", (req, res) => {
    const inputWorkTodo = req.body.workTodo.trim(); 

    if (inputWorkTodo !== "") { 
        todosWork.push({
            workTodo: inputWorkTodo
        });
    }

    res.redirect("/work");
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});