import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Plus, Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TextArea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';

interface List {
    id: number;
    title: string;
    description: string | null;
    tasks_count?: number;
}

interface Props {
    lists: List[];
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Lists',
        href: '/lists',
    }
];

export default function ({ lists, flash }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editengList, setEditengList] = useState<List | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        } else if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        }
    }, [flash]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const { data, setData, post, put, processing, reset, delete: destroy } = useFrom({
        title: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElemnt>) => {
        e.preventDefault();
        if (editngList) {
            put(route('lists.update', editingList.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setEditingLists(null);
                },
            });
        } else {
            post(route('lists.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    }
}