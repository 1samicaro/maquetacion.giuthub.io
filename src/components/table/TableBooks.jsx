import React, { useState } from "react";

import useTable from "./useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TableBooks = ({ data, rowsPerPage }) => {

    const language = useSelector(state=> state.changeLanguageReducer.id)

    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);
    return (
    <>
        <table className={styles.table}>
            {language==="1" && <thead className={styles.tableRowHeader}>
                <tr>
                    <th className={styles.tableHeader}>País</th>
                    <th className={styles.tableHeader}>Autor</th>
                    <th className={styles.tableHeader}>Nombre/Título de la obra</th>
                    <th className={styles.tableHeader}>Genero Literario</th>
                </tr>
            </thead>}
            {language==="2" && <thead className={styles.tableRowHeader}>
                <tr>
                    <th className={styles.tableHeader}>Country</th>
                    <th className={styles.tableHeader}>Author</th>
                    <th className={styles.tableHeader}>Name/Title of the work</th>
                    <th className={styles.tableHeader}>Literary genre</th>
                </tr>
            </thead>}
            {language==="3" && <thead className={styles.tableRowHeader}>
                <tr>
                    <th className={styles.tableHeader}>Pays</th>
                    <th className={styles.tableHeader}>Auteur</th>
                    <th className={styles.tableHeader}>Nom/Titre de l'œuvre</th>
                    <th className={styles.tableHeader}>Genre littéraire</th>
                </tr>
            </thead>}
            {language==="4" && <thead className={styles.tableRowHeader}>
                <tr>
                    <th className={styles.tableHeader}>País</th>
                    <th className={styles.tableHeader}>Autor</th>
                    <th className={styles.tableHeader}>Nome/Título da obra</th>
                    <th className={styles.tableHeader}>Gênero literário</th>
                </tr>
            </thead>}
            {language==="5" && <thead className={styles.tableRowHeader}>
                <tr>
                    <th className={styles.tableHeader}>Paese</th>
                    <th className={styles.tableHeader}>Autore</th>
                    <th className={styles.tableHeader}>Nome/Titolo dell'opera</th>
                    <th className={styles.tableHeader}>Genere letterario</th>
                </tr>
            </thead>}
            <tbody>
            {slice.map((el) => (
                <tr className={styles.tableRowItems} key={el.id}>
                    <td className={styles.tableCell}>{el.id}</td>
                    <td className={styles.tableCell}><Link to={`/viewWord/${el.id}`}>{el.name}</Link></td>
                    <td className={styles.tableCell}>{el.URL}</td>
                    <td className={styles.tableCell}>{el.URL}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
    );
};

export default TableBooks;