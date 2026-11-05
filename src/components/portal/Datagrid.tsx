import { datagridColumnTypes } from '@/interfaces/general';
import { DataGrid, LoadPanel } from 'devextreme-react'
import { Column, Editing, Export, GroupPanel, HeaderFilter, Pager, Scrolling, Search, SearchPanel } from 'devextreme-react/data-grid'
import React from 'react'

interface props {
    columns: any
}

export default function Datagrid_template({ columns }: props) {
    const displayModes: any[] = [
        { text: "Display Mode 'full'", value: "full" },
        { text: "Display Mode 'compact'", value: "compact" },
    ];

    const allowedPageSizes: any = ["all", 15, 50, 125, 200, 500, 1000];

    const dateFormat = 'EEE, dd MMM yyyy HH:mm'

    return (
        <div>

            <DataGrid
                dataSource={[]}
                height={430}
                showBorders={true}
                showColumnLines={true}
                showRowLines={true}
                columnResizingMode='widget'
                allowColumnResizing
                onRowClick={() => { }}

            >
                <Export enabled={true} />
                <SearchPanel visible={true} width={300} />
                <HeaderFilter visible={true} allowSearch={true} />
                <GroupPanel visible={true} />
                <Editing mode={"cell"} allowAdding={true} allowUpdating={true} />
                {/* <LoadPanel enabled={true} /> */}

                {columns?.map(({ id, dataField, caption, allowEditing, allignment, allowFiltering, dataType, width, fixed, visible }: datagridColumnTypes) => {
                    return (
                        <Column
                            key={id}
                            dataField={dataField}
                            caption={caption}
                            // dataType={dataType}
                            width={width === null ? 150 : width}
                            alignment={dataType === 'boolean' ? 'center' : 'left'}
                            fixed={fixed}
                            allowFiltering={dataType === 'boolean' ? false : true}
                            allowEditing={allowEditing}
                            visible={visible}
                            format={dataType === 'datetime' ? dateFormat : dataType}
                        />
                    )
                })}

                <Scrolling
                    useNative={false}
                    scrollByContent={true}
                    scrollByThumb={true}
                    showScrollbar="always"
                />

                <Pager
                    visible={true}
                    allowedPageSizes={allowedPageSizes}
                    // displayMode={displayModes}
                    showInfo={true}
                    showNavigationButtons={true}
                    showPageSizeSelector={true}
                />


            </DataGrid>

        </div>
    )
}
