"use client"
import Dashboard from '@/components/portal/admin-dashboard';
import { Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface props {
    addItemsx: any[];
}

export default function AdminPage() {


    // const dashboard = (
    //     <Dashboard addTab={add} setItemsx={setItems} />
    // )


    // useEffect(() => {
    //     setItems(tabPages)
    // });

    const newTabIndex = useRef(0);
    const [items, setItems] = useState<any>([]);

    console.log(items)

    const add = () => {

        const newActiveKey = `newTab${newTabIndex.current++}`;
        setItems([items]);
        setActiveKey(newActiveKey);

    };
    const tabPages: any[] = [
        { id: 0, label: 'Overview', children: <Dashboard addTab={add} setItemsx={items} />, key: '1' },
    ]

    const [activeKey, setActiveKey] = useState<any>(tabPages[0].key);

    const onChange = (key: string) => {
        setActiveKey(key);
    };


    const remove = (targetKey: TargetKey) => {
        const targetIndex = items.findIndex((pane: { key: TargetKey; }) => pane.key === targetKey);
        const newPanes = items.filter((pane: { key: TargetKey; }) => pane.key !== targetKey);
        if (newPanes.length && targetKey === activeKey) {
            const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
            setActiveKey(key);
        }
        setItems(newPanes);
    };

    const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };





    return (
        <div>
            <Tabs
                hideAdd
                onChange={onChange}
                activeKey={activeKey}
                type="editable-card"
                onEdit={onEdit}
                items={items}
            />
        </div>
    )
}
