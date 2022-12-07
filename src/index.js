/** @jsx h */

function h(type, props, ...children) {
    return { type, props, children };
}

function createElement(node) {
    if (typeof node === "string") {
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
}

function updateElement(domTree, newTemplate, oldTemplate) {
    const count = newTemplate.children.length - oldTemplate.children.length;
    if (count > 0) {
        for (
            let i = oldTemplate.children.length;
            i < newTemplate.children.length;
            i++
        ) {
            domTree.firstChild.appendChild(
                createElement(newTemplate.children[i])
            );
        }

        oldTemplate.children = oldTemplate.children.concat(
            newTemplate.children.slice(oldTemplate.children.length)
        );
        return;
    } else if (count < 0) {
        for (
            let i = domTree.firstChild.children.length;
            i > newTemplate.children.length;
            i--
        ) {
            domTree.firstChild.removeChild(
                domTree.firstChild.childNodes[i - 1]
            );
        }

        oldTemplate.children.splice(newTemplate.children.length);
        return;
    } else {
        if (newTemplate === oldTemplate) return;
        domTree.firstChild.replaceChild(
            createElement(newTemplate.children[0]),
            domTree.firstChild.childNodes[0]
        );
        return;
    }
}

const initDOM = (
    <div>
        <p>Hello!</p>
        <ul>
            <li>How is it going?</li>
        </ul>
    </div>
);

const addNode = (
    <div>
        <p>Hello!</p>
        <ul>
            <li>How is it going?</li>
        </ul>
        <p>Good</p>
    </div>
);

const removeNode = (
    <div>
        <p>Hello!</p>
        <ul>
            <li>How is it going?</li>
        </ul>
    </div>
);

const changeNode = (
    <div>
        <p>Hi!</p>
        <ul>
            <li>How is it going?</li>
        </ul>
    </div>
);

const rootElement = document.getElementById("root");
rootElement.appendChild(createElement(initDOM));

const initNodeButton = document.createElement("button");
initNodeButton.innerText = "Init";
rootElement.appendChild(initNodeButton);
initNodeButton.addEventListener("click", () => {
    updateElement(rootElement, initDOM, initDOM);
});

const addNodeButton = document.createElement("button");
addNodeButton.innerText = "Add";
rootElement.appendChild(addNodeButton);
addNodeButton.addEventListener("click", () => {
    updateElement(rootElement, addNode, initDOM);
});

const removeNodeButton = document.createElement("button");
removeNodeButton.innerText = "Remove";
rootElement.appendChild(removeNodeButton);

removeNodeButton.addEventListener("click", () => {
    updateElement(rootElement, removeNode, addNode);
});

const changeNodeButton = document.createElement("button");
changeNodeButton.innerText = "Change";
rootElement.appendChild(changeNodeButton);

changeNodeButton.addEventListener("click", () => {
    updateElement(rootElement, changeNode, removeNode);
});
