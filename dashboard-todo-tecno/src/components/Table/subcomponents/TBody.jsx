import React from "react";

function TBody(props) {

    return (

        <tbody>
            {
                props.data.map((row, i) => (

                    <tr key={row.title + i}>
                        {props.columns.map((col) => (
                            <td>{row[col]}</td>
                        ))}
                    </tr>
                ))
            }


        </tbody>
    )
}

export default TBody;