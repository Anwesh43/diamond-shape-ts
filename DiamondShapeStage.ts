const w : number = window.innerWidth
const h : number = window.innerHeight
const scGap : number = 0.05
const scDiv : number = 0.51
const nodes : number = 5
const ends : number = 2
const strokeFactor : number = 90
const sizeFactor : number = 2.9
const foreColor : string = "#1976D2"
const backColor : string = "#BDBDBD"

const maxScale : Function = (scale : number, i : number, n : number) : number => {
    return Math.max(0, scale - i / n)
}

const divideScale : Function = (scale : number, i : number, n : number) : number => {
    return Math.min(1 / n, maxScale(i, n)) * n
}

const scaleFactor : Function = (scale : number) : number => {
    return Math.floor(scale / scDiv)
}

const mirrorValue : Function = (scale : number, a : number, b : number) : number => {
    const k : number = scaleFactor(scale)
    return (1 - k) / a + k / b
}

const updateValue : Function = (scale : number, dir : number, a : number, b : number) : number => {
    return mirrorValue(scale, a, b) * dir * scGap
}

const drawDSNode : Function = (context : CanvasRenderingContext2D, i : number, scale : number) => {
    const gap : number = h / (nodes + 1)
    const size : number = gap / sizeFactor
    const sc1 : number = divideScale(scale, 0, 2)
    const sc2 : number = divideScale(scale, 1, 2)
    context.lineCap = 'round'
    context.lineWidth = Math.min(w, h) / strokeFactor
    context.fillStyle = foreColor
    context.save()
    context.translate(w / 2, gap * (i + 1))
    context.rotate(Math.PI/2 * sc2)
    context.fillRect(-size, -size/2, 2 * size, size)
    for (var j = 0; j < ends; j++) {
        const sf : number = 1 - 2 * j
        const sc : number = divideScale(scale, j, ends)
        context.save()
        context.beginPath()
        context.moveTo(-size, -size/2 * sf)
        context.lineTo(-size, (-size/2 - size/2 * sc) * sf)
        context.lineTo(size, -size/2 * sf)
        context.fill()
        context.restore()
    }
    context.restore()
}

class DiamondShapeStage {
    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D

    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : DiamondShapeStage = new DiamondShapeStage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}
