import React, { useState } from "react";

import useTable from "./useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);
    return (
    <>
        <table className={styles.table}>
            <thead className={styles.tableRowHeader}>
                <tr>
                    <th className={styles.tableHeader}>Usuario</th>
                    <th className={styles.tableHeader}>Rol</th>
                    <th className={styles.tableHeader}>ID</th>
                    <th className={styles.tableHeader}>Verificado</th>
                    <th className={styles.tableHeader}>Baneado</th>
                    {/* <th className={styles.tableHeader}>Documento</th> */}
                    <th className={styles.tableHeader}>Correo</th>
                </tr>
            </thead>
            <tbody>
            {slice.map((el) => (
                <tr className={styles.tableRowItems} key={el.id}>
                    <td className={styles.tableCell}>{el.username}</td>
                    <td className={styles.tableCell}>{el.Role.name}</td>
                    <td className={styles.tableCell}>{el.id}</td>
                    <td className={styles.tableCell}>{el.isVerified? "Verificado": "No verificado"}</td>
                    <td className={styles.tableCell}>{el.isBanned? "Baneado": "No baneado"}</td>
                    {/* <td className={styles.tableCell}>{el.docs? el.docs[0]: "No posee documento"}</td> */}
                    <td className={styles.tableCell}>{el.email}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
    );
};

export default Table;