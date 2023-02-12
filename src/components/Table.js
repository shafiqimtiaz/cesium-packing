import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Utils from '../controllers/Utils';

const Table = (props) => {

    const {
        SelectedOrderLine,
    } = useContext(GlobalContext);

    const { toggleRow } = Utils();

    const header = ["Order Line", "SKU", "Picked Qty", "Remaining Qty", "Description", "UPC"];

    const TableHeader = () => {
        return (
            <thead className="thead-dark">
                <tr>
                    {header.map((key, index) => (
                        <th scope="col" key={index}>{key.toUpperCase()}</th>
                    ))}
                </tr>
            </thead>
        );
    };

    const TableBody = ({data}) => {
        const rows = data.map((row, index) => {
            return (
                <tr key={index} className={row.orderLine === SelectedOrderLine ? 'table-active' : ''}
                    onClick={() => toggleRow(row.orderLine)}>
                    <td>{row.orderLine}</td>
                    <td>{row.sku}</td>
                    <td>{row.pickedQty}</td>
                    <td>{row.remainingQty}</td>
                    <td>{row.description}</td>
                    <td>{row.upc}</td>
                </tr >
            );
        });
        return <tbody>{rows}</tbody>;
    };

    return {
        TableHeader,
        TableBody,
    };
};

export default Table;