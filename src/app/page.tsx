'use client';

import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatRupiah } from '@/lib/utils';
import { Car } from '@prisma/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/car?search=${search}`).then(async (car) => {
      const data = await car.json();
      console.log(data);
      if (data.success) {
        setCars(data.data);
      }
    });
    setIsLoading(false);
  }, [search]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-secondary space-y-4">
      <h1 className="text-3xl">Simple Car Management</h1>
      <div className="flex flex-col self-start">
        <div className="flex space-x-2">
          <Link
            href={'/car/new'}
            className={buttonVariants({ variant: 'default' })}
          >
            Create New Car
          </Link>
          <Input
            type="text"
            id="brand"
            placeholder="Search Car"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="w-48">Number of Stocks</TableHead>
            <TableHead>Price (IDR)</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <h1 className="text-lg">Loading... </h1>
          ) : (
            cars.map((car) => {
              return (
                <TableRow key={car.id}>
                  <TableCell className="font-medium">{car.id}</TableCell>
                  <TableCell>{car.brand}</TableCell>
                  <TableCell>{car.type}</TableCell>
                  <TableCell>{car.stock}</TableCell>
                  <TableCell>{formatRupiah(car.price)}</TableCell>
                  <TableCell>{car.notes}</TableCell>
                  <TableCell>
                    <Link
                      href={`/car/${car.id}`}
                      className={buttonVariants({ variant: 'outline' })}
                    >
                      <svg
                        data-slot="icon"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        ></path>
                      </svg>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </main>
  );
}
