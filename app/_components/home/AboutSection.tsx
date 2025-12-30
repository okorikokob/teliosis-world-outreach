import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/src/components/ui/button';

export default function AboutSection() {
	return (
		<section className="py-24 sm:py-16  ">
			<div className="layout-container--wide grid items-center gap-4 sm:gap-12 lg:grid-cols-12">
				{/* Left: Stacked images */}
				<div className="lg:col-span-6 mt-20">
					<div className="relative max-w-md ">
						<Image
							src="/images/home/about-us-img-1.jpg"
							alt="Worship at Teliosis World Outreach"
							className="w-[25rem] h-auto rounded-br-[6rem] shadow"
							width={500}
							height={750}
							priority={false}
						/>
						<div className="absolute bottom-45 -right-40 w-[80%]">
							<Image
								src="/images/home/about-us-img-2.jpg"
								alt="Community and fellowship at Teliosis"
								className="w-full h-auto rounded-br-[6rem]  border-6 border-color-white bg-color-background"
								width={500}
								height={700}
							/>
						</div>
					</div>
				</div>

				{/* Right: Content */}
				<div className="lg:col-span-6  self-start lg:pl-8 xl:pl-12 relative mt-10 ">
					<div className="max-w-prose">
						<h4 className="body-sm font-semibold mb-4 text-color-primary font-fira-condensed">ABOUT US</h4>
						<h2 className="h2 mb-4 capitalize font-fira-condensed">
							FAITH, HOPE, AND LOVE IN <span className="text-color-primary">ACTION EVERY DAY</span>
						</h2>
						<p className="mb-8 body-sm text-color-muted font-fira-condensed leading-relaxed">
							Join us as we grow together in faith through worship, the Word, and community. There’s a place for you here. Join us as we grow together in faith through worship, the Word, and community. There’s a place for you here.Join us as we grow together in faith through worship, the Word, and community. There’s a place for you here.
						</p>
						{(() => {
							const features = [
								"Share God's love with others",
								"Foster Spiritual growth",
								"Share God's love with others",
								"Foster Spiritual growth",
							];
							return (
								<ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 mb-8" role="list">
									{features.map((item, i) => (
										<li key={i} className="flex items-start gap-2">
											<span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-color-primary text-color-primary-foreground">
												<svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
													<path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.42l2.293 2.293 6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd" />
												</svg>
											</span>
											<span className="body-sm text-color-muted font-fira-condensed">{item}</span>
										</li>
									))}
								</ul>
							);
						})()}
                       
						<Link href="/about" className="inline-block">
							<Button variant="primary" size="lg">Learn More</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

