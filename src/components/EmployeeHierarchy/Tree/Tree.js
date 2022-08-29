// React Hooks
import { useState } from "react";

//Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import './tree.css'


const Tree = (props) => {
    let data = props.data;
    console.log(data);

    return (
        <div className="d-tree">
            <ul className="d-flex d-tree-container flex-column">
                { data.length !== 0 ? data.map(tree => (
                    <TreeNode node={ tree } />
                )) : <TreeNode node={ data } /> }
            </ul>
        </div>
    );
};


const TreeNode = (props) => {
    let node = props.node;
    console.log(node);

    const [ childVisibility, setChildVisibility ] = useState(false);

    const hasChild = node.children ? true : false;
    console.log(node.children);

    for (let i = 0; i < node.children.length; i++) {
        console.log(node.children[i].length);
    }

    return (
        <li className="d-tree-node border-0">
            <div className="d-flex" onClick={ (event) => setChildVisibility(prevState => !prevState) }>
                { hasChild && (
                    <div className={`d-inline d-tree-toggler ${ childVisibility ? "active" : "" }`}>
                        <FontAwesomeIcon icon="caret-right" />
                    </div>
                ) }

                <div className="col d-tree-head">
                    <i className={ `mr-1 caret-right` }></i>
                    { node.id }
                </div>
            </div>
            {
                hasChild && childVisibility && <div className="d-tree-content">
                    <ul className="d-flex d-tree-container flex-column">
                        { node.children.map((child, i) => (
                            <>
                                { node.children[i].length === 1 ? <Tree data={ node.children[i] } /> : <TreeNode node={ node.children[i] } /> }
                            </>
                        )) }
                    </ul>
                </div>
            }
        </li>
    )
}


export default Tree;