import Link from 'next/link'

export default function Section1() {
	return (
		<div className="hero8-slider-area" style={{ backgroundImage: 'url(assets/img/bg/header-bg19.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center bottom' }}>
			<img src="/assets/img/elements/layer1.png" alt="" className="layer1" />
			<div className="container">
				<div className="row">
					<div className="col-lg-8 m-auto">
						<div className="hero8-header text-center">
							<h1 className="text-anime-style-3"><img src="/assets/img/logo/logo.png" alt="DevBcn" /></h1>
							<h4>The Barcelona Developers Conference</h4>
							<h5>June 16th - 17th, 2026</h5>
							<h5>World Trade Center, Barcelona</h5>
							<div className="space32" />
							<div className="space24" />
							<div className="space40" />
							<h5>5 tracks with the following topics:
								Java & JVM | Cloud, DevOps, VMs, Kubernetes | Frontend, JavaScript, TypeScript, Angular, WASM | Leadership, Agile, Diversity | Big Data, Machine Learning, AI, Python</h5>
							<div className="space24" />
							<div className="btn-area1" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
								<Link href="/contact" className="vl-btn8"><span className="demo">🎟️ Reserve your Seat</span></Link>
								<Link href="/contact" className="vl-btn8"><span className="demo">🎙️ Become a Speaker</span></Link>
								<Link href="/contact" className="vl-btn8"><span className="demo">🤝🏽 Sponsorship</span></Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
