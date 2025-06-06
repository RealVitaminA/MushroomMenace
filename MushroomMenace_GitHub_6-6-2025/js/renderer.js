/**
 * Renderer for Mushroom Menace
 * Handles canvas drawing operations
 */
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.sprites = {};
        this.loaded = false;
        this.frameSize = 64;
        
        // Set up pixel art rendering
        this.ctx.imageSmoothingEnabled = false;
        
        // Load sprite sheets
        this.loadSprites();
    }
    
    loadSprites() {
        // Define sprite sheets to load
        const spriteSheets = {
            'playerNormal': 'assets/images/playerNormal.png',
            'playerFire': 'assets/images/playerFire.png',
            'mushroom1': 'assets/images/mushroom1.png',
            'mushroom2': 'assets/images/mushroom2.png',
            'mushroom3': 'assets/images/mushroom3.png',
            'mushroom4': 'assets/images/mushroom4.png',
            'inchwormHead': 'assets/images/inchwormHeadOnly.png',
            'inchwormSegment': 'assets/images/inchwormSegment.png',
            'flea': 'assets/images/flea.png',
            'spider': 'assets/images/spider.png',
            'scorpion': 'assets/images/scorpion.png',
            'projectile': 'assets/images/projectile.png',
            'explosionSmall': 'assets/images/explosionSmall.png',
            'explosionMedium': 'assets/images/explosionMedium.png',
            'explosionLarge': 'assets/images/explosionLarge.png'
        };
        
        let loadedCount = 0;
        const totalSprites = Object.keys(spriteSheets).length;
        
        // Load each sprite sheet
        for (const [name, path] of Object.entries(spriteSheets)) {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalSprites) {
                    this.loaded = true;
                    console.log('All sprites loaded');
                }
            };
            img.onerror = () => {
                console.error(`Failed to load sprite: ${name}`);
            };
            img.src = path;
            this.sprites[name] = img;
        }
    }
    
    clear() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    
    drawPlayer(player) {
        if (!this.loaded) return;
        const img = player.frameX === 1 ? this.sprites.playerFire : this.sprites.playerNormal;
        this.ctx.drawImage(
            img,
            0, 0,
            img.width, img.height,
            player.x, player.y,
            player.width, player.height
        );
    }

    
    
    drawMushroom(mushroom) {
        if (!this.loaded) return;
        let img = this.sprites.mushroom4;
        switch(mushroom.health){
            case 4: img = this.sprites.mushroom4; break;
            case 3: img = this.sprites.mushroom3; break;
            case 2: img = this.sprites.mushroom2; break;
            default: img = this.sprites.mushroom1; break;
        }
        this.ctx.drawImage(
            img,
            0,0,
            img.width, img.height,
            mushroom.x, mushroom.y,
            mushroom.width, mushroom.height
        );
    }

    
    
    drawInchwormSegment(segment) {
        if (!this.loaded) return;
        const img = segment.isHead ? this.sprites.inchwormHead : this.sprites.inchwormSegment;
        this.ctx.drawImage(
            img,
            0,0,
            img.width, img.height,
            segment.x, segment.y,
            segment.width, segment.height
        );
    }

    
    
    drawEnemy(enemy) {
        if (!this.loaded) return;
        let img = this.sprites.flea;
        switch(enemy.type){
            case 'flea': img = this.sprites.flea; break;
            case 'spider': img = this.sprites.spider; break;
            case 'scorpion': img = this.sprites.scorpion; break;
        }
        this.ctx.drawImage(
            img,
            0,0,
            img.width, img.height,
            enemy.x, enemy.y,
            enemy.width, enemy.height
        );
    }
    
    drawProjectile(projectile) {
        if (!this.loaded || !this.sprites.projectile) return;
        
        this.ctx.drawImage(
            this.sprites.projectile,
            0, 0,
            projectile.width, projectile.height,
            projectile.x, projectile.y,
            projectile.width, projectile.height
        );
    }
    
    
    drawExplosion(explosion) {
        if (!this.loaded) return;
        let img = this.sprites.explosionSmall;
        if (explosion.size === 'medium') img = this.sprites.explosionMedium;
        else if (explosion.size === 'large') img = this.sprites.explosionLarge;
        this.ctx.drawImage(
            img,
            0,0,
            img.width, img.height,
            explosion.x, explosion.y,
            explosion.width, explosion.height
        );
    }

    
    drawGrid(gridSize, color = 'rgba(255, 255, 255, 0.1)') {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        
        // Draw vertical lines
        for (let x = 0; x <= this.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }
        
        // Draw horizontal lines
        for (let y = 0; y <= this.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }
    }
    
    drawText(text, x, y, color = '#0f0', size = '16px', align = 'left') {
        this.ctx.fillStyle = color;
        this.ctx.font = `${size} 'Courier New', monospace`;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x, y);
    }
    
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        
        // Reset pixel art rendering
        this.ctx.imageSmoothingEnabled = false;
    }
}