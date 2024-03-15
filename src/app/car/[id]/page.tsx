'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CarEdit({ params }: { params: { id: string } }) {
  const [form, setForm] = useState({
    brand: '',
    type: '',
    stock: 0,
    price: 0,
    notes: '',
    updatedAt: new Date(),
  });
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/car/${params.id}`).then(async (data) => {
      const car = await data.json();
      setForm(car.data);
    });
  }, [params.id]);

  async function editCar() {
    const res = await fetch(`/api/car/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      router.push('/');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col space-y-2 w-full max-w-lg">
        <h1 className="font-bold">Create New Car</h1>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="brand">Brand</Label>
          <Input
            type="text"
            id="brand"
            placeholder="Brand..."
            value={form.brand}
            onChange={(e) => {
              setForm({
                ...form,
                brand: e.target.value,
              });
            }}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="type">Type</Label>
          <Input
            type="text"
            id="type"
            placeholder="Type..."
            value={form.type}
            onChange={(e) => {
              setForm({
                ...form,
                type: e.target.value,
              });
            }}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="stocks">Stocks</Label>
          <Input
            type="number"
            id="stocks"
            placeholder="Number of Stocks..."
            onChange={(e) => {
              setForm({
                ...form,
                stock: parseInt(e.target.value),
              });
            }}
            value={form.stock}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            placeholder="Price..."
            onChange={(e) => {
              setForm({
                ...form,
                price: parseInt(e.target.value),
              });
            }}
            value={form.price}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="notes">Notes</Label>
          <Input
            type="text"
            id="notes"
            placeholder="Notes"
            onChange={(e) => {
              setForm({
                ...form,
                notes: e.target.value,
              });
            }}
            value={form.notes}
          />
        </div>
        <Button onClick={editCar}>Save</Button>
      </div>
    </div>
  );
}
