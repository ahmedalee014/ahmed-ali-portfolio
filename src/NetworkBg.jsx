import { useEffect, useRef } from 'react'

export default function NetworkBg() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let raf = 0, particles = [], width = 0, height = 0, dpr = 1
    const mouse = { x: -1000, y: -1000 }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const touchMode = window.matchMedia('(pointer: coarse)').matches

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth; height = window.innerHeight
      canvas.width = Math.floor(width * dpr); canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const density = width < 600 ? 26000 : 19000
      const count = Math.min(80, Math.max(18, Math.floor(width * height / density)))
      particles = Array.from({ length: count }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28, r: Math.random() * 1.1 + .3 }))
    }
    const onMove = e => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onLeave = () => { mouse.x = -1000; mouse.y = -1000 }

    function render() {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (!reduceMotion) {
          p.x += p.vx; p.y += p.vy
          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1
          if (!touchMode) {
            const dx = p.x - mouse.x, dy = p.y - mouse.y, distance = Math.hypot(dx, dy)
            if (distance > 0 && distance < 95) { const force = (95 - distance) / 95 * .5; p.x += dx / distance * force; p.y += dy / distance * force }
          }
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(75,190,235,.38)'; ctx.fill()
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j], dx = p.x - q.x, dy = p.y - q.y, distance = Math.hypot(dx, dy)
          if (distance < 110) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(75,190,235,${(1 - distance / 110) * .12})`; ctx.lineWidth = .6; ctx.stroke() }
        }
      }
      if (!reduceMotion) raf = requestAnimationFrame(render)
    }
    resize(); render()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseleave', onLeave) }
  }, [])
  return <canvas ref={canvasRef} className="network-canvas" aria-hidden="true" />
}
