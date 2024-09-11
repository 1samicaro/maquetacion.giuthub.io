import React, { useEffect, useState } from 'react'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel
} from '@tanstack/react-table'
import classNames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
    MagnifyingGlassIcon,
    BarsArrowDownIcon,
    BarsArrowUpIcon,
    ChevronUpDownIcon,
    ChevronDoubleLeftIcon,
    ChevronLeftIcon,
    ChevronDoubleRightIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)

    console.log(itemRank);

    addMeta({ itemRank })

    return itemRank.passed
}

const DebouncedInput = ({ value: keyWord, onChange, ...props }) => {
    const [value, setValue] = useState(keyWord);
    
    useEffect(() => {
        const timeout = setTimeout(() => {
        console.log('Filterd');
        console.log(value);
        onChange(value);
        }, 500)

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <input {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
}

const DataTable = () => {
    const booksCatalogo = useSelector(state=> state.booksInfoReducer?.booksCatalogo)
    const language = useSelector(state=> state.changeLanguageReducer.id)
    const [data, setData] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])

    
    // if(books.length>0 && data.length===0){
    //     setData(books)
    // }

    useEffect(() => {
        setData(booksCatalogo)
    }, [booksCatalogo, language])

    let columns  = []
    // if(language===1){
    //     columns = [
    //         {
    //         accessorKey: 'Country.name',
    //         header: () => <span id="titulo6">País</span>
    //         },
    //         {
    //             accessorKey: 'author',
    //             header: () => <span id="titulo6">Autor</span>
    //         },
    //         {
    //         accessorKey: 'name',
    //         header: () => <span id="titulo6">Nombre/Título de la obra</span>,
    //         // cell: info => <span className='font-bold'>{info.getValue()}</span>
    //         // cell: info => <span id="titulo10">{info.getValue()}</span>
    //         cell: info => <Link to={`/viewWord/${info.getValue()}`}><p id="titulo7">{info.getValue()}</p></Link>
    //         },
    //         {
    //             accessorKey: 'Genre.name',
    //             header: () => <span id="titulo6">Género</span>
    //         },
    //         // {
    //         // accessorKey: 'id',
    //         // header: () => <span id="titulo6">Visualizar Libro</span>,
    //         // cell: info => <Link to={`/viewWord/${info.getValue()}`}><p id="titulo7">Ver Libro</p></Link>
    //         // },
    //     ]
    // }
    if(language===1){
        columns = [
            {
            accessorKey: 'Country.name',
            header: () => <span id="titulo6">País</span>
            },
            {
                accessorKey: 'author',
                header: () => <span id="titulo6">Autor</span>
            },
            {
            accessorKey: 'name',
            header: () => <span id="titulo6">Nombre/Título de la obra</span>,
            // cell: info => <span className='font-bold'>{info.getValue()}</span>
            // cell: info => <span id="titulo10">{info.getValue()}</span>
            cell: info => <Link to={`/viewWord/${info.getValue()}`}><p id="titulo7">{info.getValue()}</p></Link>
            },
            {
            accessorKey: 'Genre.name',
            header: () => <span id="titulo6">Género</span>
            },
            // {
            // accessorKey: 'id',
            // header: () => <span id="titulo6">Visualizar Libro</span>,
            // cell: info => <Link to={`/viewWord/${info.getValue()}`}><p id="titulo7">Ver Libro</p></Link>
            // },
        ]
    }
    if(language===2){
        columns = [
            {
                accessorKey: 'Country.name',
                header: () => <span id="titulo6">Country</span>
            },
            {
                accessorKey: 'author',
                header: () => <span id="titulo6">Author</span>
            },
            {
            accessorKey: 'name',
            header: () => <span id="titulo6">Name/Title of the work</span>,
            // cell: info => <span className='font-bold'>{info.getValue()}</span>
            // cell: info => <span id="titulo10">{info.getValue()}</span>
            cell: info => <Link to={`/viewWord/${info.getValue()}`}><p id="titulo7">{info.getValue()}</p></Link>
            },
            {
                accessorKey: 'Genre.name',
                header: () => <span id="titulo6">Genre</span>
            },
            // {
            // accessorKey: 'id',
            // header: () => <span id="titulo6">View Book</span>,
            // cell: info => <Link to={`/viewWord/${info.getValue()}`}><p id="titulo7">See Book</p> </Link>
            // },
        ]
    }
    if(language===3){
        columns = [
            {
                accessorKey: 'Country.name',
                header: () => <span id="titulo6">Pays</span>
            },
            {
                accessorKey: 'author',
                header: () => <span id="titulo6">Auteur</span>
            },
            {
            accessorKey: 'name',
            header: () => <span id="titulo6">Nom/Titre de l'œuvre</span>,
            // cell: info => <span className='font-bold'>{info.getValue()}</span>
            // cell: info => <span id="titulo10">{info.getValue()}</span>
            cell: info => <Link to={`/viewWord/${info.getValue()}`}><p id="titulo7">{info.getValue()}</p></Link>
            },
            {
                accessorKey: 'Genre.name',
                header: () => <span id="titulo6">Genre</span>
            },
            // {
            // accessorKey: 'id',
            // header: () => <span id="titulo6">Voir le livre</span>,
            // cell: info => <Link to={`/viewWord/${info.getValue()}`}> <p id="titulo7">Voir Réserver</p></Link>
            // },
        ]
    }
    if(language===4){
        columns = [
            {
                accessorKey: 'Country.name',
                header: () => <span id="titulo6">País</span>
            },
            {
                accessorKey: 'author',
                header: () => <span id="titulo6">Autor</span>
            },
            {
            accessorKey: 'name',
            header: () => <span id="titulo6">Nome/Título da obra</span>,
            // cell: info => <span className='font-bold'>{info.getValue()}</span>
            // cell: info => <span id="titulo10">{info.getValue()}</span>
            cell: info => <Link to={`/viewWord/${info.getValue()}`}><p id="titulo7">{info.getValue()}</p></Link>
            },
            {
                accessorKey: 'Genre.name',
                header: () => <span id="titulo6">Gênero</span>
            },
            // {
            // accessorKey: 'id',
            // header: () => <span id="titulo6">Ver livro</span>,
            // cell: info => <Link to={`/viewWord/${info.getValue()}`}><p id="titulo7">Ver livro</p></Link>
            // },
        ]
    }
    if(language===5){
        columns = [
            {
                accessorKey: 'Country.name',
                header: () => <span id="titulo6">Paese</span>
            },
            {
                accessorKey: 'author',
                header: () => <span id="titulo6">Autore</span>
            },
            {
            accessorKey: 'name',
            header: () => <span id="titulo6">Nome/Titolo dell'opera</span>,
            // cell: info => <span className='font-bold'>{info.getValue()}</span>
            // cell: info => <span id="titulo10">{info.getValue()}</span>
            cell: info => <Link to={`/viewWord/${info.getValue()}`}><p id="titulo7">{info.getValue()}</p></Link>
            },
            {
                accessorKey: 'Genre.name',
                header: () => <span id="titulo6">Genere</span>
            },
            // {
            // accessorKey: 'id',
            // header: () => <span id="titulo6">Visualizar Libro</span>,
            // cell: info => <Link to={`/viewWord/${info.getValue()}`}><p id="titulo7">Vedi Libro</p></Link>
            // },
        ]
    }

    const getStateTable = () => {
        const totalRows = table.getFilteredRowModel().rows.length;
        const pageSize = table.getState().pagination.pageSize;
        const pageIndex = table.getState().pagination.pageIndex;
        const rowsPerPage = table.getRowModel().rows.length;

        const firstIndex = (pageIndex * pageSize) + 1;
        const lastIndex = (pageIndex * pageSize) + rowsPerPage;

        return {
            totalRows,
            firstIndex,
            lastIndex
        }
    }

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            sorting
        },
        initialState: {
        pagination: {
            pageSize: 10
        }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting
    })

    return (
        <div className='px-6 py-4'>

        {/* <div className='my-2 flex justify-end'>
            <div className='relative'>
            <DebouncedInput
                type="text"
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(String(value))}
                className='px-6 py-2 text-gray-600 border border-gray-300 rounded outline-indigo-700'
                placeholder='Buscar...'
            />
            <MagnifyingGlassIcon className='w-5 h-5' />
            </div>
        </div> */}
        <div className='overflow-auto'>
        <table className='table-auto w-full min-w-[560px]'>
            <thead>
                {table?.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-gray-300 text-gray-600 bg-gray-100" >
                    {headerGroup.headers.map(header => (
                    <th key={header.id} className="py-2 px-4 text-left uppercase">
                        {header.isPlaceholder
                        ? null
                        :
                        <div
                            className={classNames({
                            'cursor-pointer select-none flex justify-between': header.column.getCanSort(),
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                        >
                            {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                            {{
                            asc: <BarsArrowUpIcon className='w-5 h-5' />,
                            desc: <BarsArrowDownIcon className='w-5 h-5' />
                            }[header.column.getIsSorted()] ?? (header.column.getCanSort() ? <ChevronUpDownIcon className='w-5 h-5' /> : null)}
                        </div>
                        }
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody id="titulo11">
                {table?.getRowModel().rows.map(row => (
                <tr key={row.id} className="text-white-600 hover:bg-cyan-800" >
                    {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="py-2 px-4" >
                        {/* <Link to={`/viewWord/${cell.id}`}> */}
                            {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                            )}
                        {/* </Link> */}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        <div className='mt-4 md:flex items-center justify-between space-y-4 text-center'>
            <div className='flex items-center gap-2'>
            <button
                className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
                disabled:hover:bg-white disabled:hover:text-gray-300'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}>
                <ChevronDoubleLeftIcon className='w-5 h-5' />
            </button>
            <button
                className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
                disabled:hover:bg-white disabled:hover:text-gray-300'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}>
                <ChevronLeftIcon className='w-5 h-5' />
            </button>

            {/* {table.getPageOptions().map((value, key) => (
                <button key={key}
                className={classNames({
                    "text-gray-600 bg-gray-200 py-0.5 px-2 font-bold rounded border border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-300": true,
                    "bg-indigo-200 text-indigo-700": value === table.getState().pagination.pageIndex
                })}
                onClick={() => table.setPageIndex(value)}>
                {value + 1}
                </button>
            ))} */}

            <button
                className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
                disabled:hover:bg-white disabled:hover:text-gray-300'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                <ChevronRightIcon className='w-5 h-5' />
            </button>
            <button
                className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
                disabled:hover:bg-white disabled:hover:text-gray-300'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}>
                <ChevronDoubleRightIcon className='w-5 h-5' />
            </button>
            </div>
            <div id="titulo9">
            Mostrando de {getStateTable().firstIndex}&nbsp;
            a {getStateTable().lastIndex}&nbsp;
            del total de {getStateTable().totalRows} registros
            </div>
            <select id="titulo8"
            className='text-gray-600 border border-gray-300 rounded outline-indigo-700 py-2'
            onChange={e => {
                table.setPageSize(Number(e.target.value))
            }}>
            {/* <option value="5">5 pág.</option> */}
            <option value="10" id="titulo8">10 pág.</option>
            <option value="20" id="titulo8">20 pág.</option>
            <option value="25" id="titulo8">25 pág.</option>
            <option value="50" id="titulo8">50 pág.</option>
            </select>
        </div>
        </div>
    )
}

export default DataTable