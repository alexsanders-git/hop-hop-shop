import Link from 'next/link';

import SectionContainer from '@/components/SectionContainer/SectionContainer';
import Image from 'next/image';

interface IEvent {
  id: number;
  name: string;
  date: string;
  location: string;
  speakers: ISpeaker[];
}

interface ISpeaker {
  id: number;
  name: string;
  image: IImage;
}

interface IImage {
  id: number;
  imagePath: string;
  description: string;
}

export default async function TestPage() {
  const res = await fetch('https://not-misto.onrender.com/api/v1/event', {
    next: { revalidate: 10 }
  });
  const events = (await res.json()) as IEvent[];

  return (
    <section>
      <SectionContainer>
        <ul>
          {events.map((event: IEvent) => {
            return (
              <li key={event.id}>
                <Link href={`/test-page/${event.id.toString()}`}>
                  {event.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <Image
          src="https://images.unsplash.com/photo-1608306448197-e83633f1261c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={250}
          height={500}
          alt="test"
        />

        <Image src="/test.jpg" width={250} height={500} alt="test" />
      </SectionContainer>
    </section>
  );
}
