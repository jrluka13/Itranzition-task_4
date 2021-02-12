import React, { useEffect, useState } from 'react';

function IndexItem({data, index, onClick, isSelectAll}) {
    const [isChecked, setChecked] = useState(false);
    useEffect(() => {
      setChecked(isSelectAll);
      onClick(isSelectAll);
    }, [isSelectAll])

    const ClickOnBox = () => {
        setChecked(!isChecked);
        if (!isChecked) {
          onClick(true);
        }
        else {
          onClick(false, index);
        }
      };

      //console.log(data);
    return (
        <tr key={index}>
                <th scope="row">
                  <input
                    type="checkbox"
                    onClick={(event) => {
                      ClickOnBox(event);

                    }}
                    className="box"
                    checked={isChecked}
                    name=""
                    id=""
                  />
                </th>
                <th scope="row">{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.mail}</td>
                <td>{data.dateOfSign}</td>
                <td>{data.dateOFLastLogin}</td>
                <td>{data.status}</td>
              </tr>
    )
}

export default IndexItem;