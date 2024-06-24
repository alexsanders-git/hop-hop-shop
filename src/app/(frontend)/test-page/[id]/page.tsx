import Image from 'next/image';
import { notFound } from 'next/navigation';

import SectionContainer from '@/components/SectionContainer/SectionContainer';

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

type Props = {
  params: {
    id: string;
  };
};

export default async function EventPage({ params: { id } }: Props) {
  const res = await fetch(`https://not-misto.onrender.com/api/v1/event/${id}`, {
    next: { revalidate: 10 }
  });

  const event = (await res.json()) as IEvent;

  if (!event) {
    notFound();
  }

  return (
    <div>
      <SectionContainer>
        <h2>{event.name}</h2>
        <h3>{event.date}</h3>
        <h3>${event.location}</h3>

        {event.speakers.map((speaker) => (
          <div key={speaker.id}>
            <Image
              src={speaker.image.imagePath}
              width={250}
              height={250}
              alt={speaker.name}
            />
          </div>
        ))}
      </SectionContainer>
    </div>
  );
}
