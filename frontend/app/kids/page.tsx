import { Header } from '../components';
import { MinistryPage } from '../components/MinistryPage';
import { MinistryData } from '@/app/types/ministry';
import { promises as fs } from 'fs';
import path from 'path';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Union Kids',
};

async function getData(): Promise<MinistryData> {
  const jsonPath = path.join(process.cwd(), 'app', 'kids', 'data.json');
  const fileContents = await fs.readFile(jsonPath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function UnionKids() {
  const data = await getData();

  return (
    <>
      <Header variant="light" />
      <MinistryPage data={data} />
    </>
  );
}
