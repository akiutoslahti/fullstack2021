import { Todo } from "./Todos/List";
import { render } from "@testing-library/react";

test("renders not done todo", () => {
    const todo = {
        text: "todo test",
        done: false,
    };

    const component = render(
        <Todo todo={todo} onClickComplete={() => {}} onClickDelete={() => {}} />
    );

    expect(component.container).toHaveTextContent(todo.text);
    expect(component.container).toHaveTextContent("This todo is not done");
    expect(component.container).toHaveTextContent("Delete");
    expect(component.container).toHaveTextContent("Set as done");
});

test("renders done todo", () => {
    const todo = {
        text: "todo test",
        done: true,
    };

    const component = render(
        <Todo todo={todo} onClickComplete={() => {}} onClickDelete={() => {}} />
    );

    expect(component.container).toHaveTextContent(todo.text);
    expect(component.container).toHaveTextContent("This todo is done");
    expect(component.container).toHaveTextContent("Delete");
    expect(component.container).not.toHaveTextContent("Set as done");
});
