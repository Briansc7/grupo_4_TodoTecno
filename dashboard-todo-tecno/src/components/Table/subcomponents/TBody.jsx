import React from "react";

function TBody(props) {

    return (

        <tbody>
            {
                props.data.map((row, i) => (

                    <tr key={row.title + i} onClick={() => openLink(row.link)}>
                        {props.columns.map((col) => (
                            <td>{row[col]}</td>
                        ))}
                    </tr>
                ))
            }


        </tbody>
    )
}

function openLink(link){
    window.open(link, '_blank');
}

export default TBody;