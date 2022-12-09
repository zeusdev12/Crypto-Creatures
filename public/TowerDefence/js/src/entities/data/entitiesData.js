const audioData = [
    {
        name: 'turretShot2',
        path: 'TowerDefence/assets/sounds/effects/TurretShot2.wav'
    },
    {
        name: 'enemyDeath',
        path: 'TowerDefence/assets/sounds/effects/EnemyDeath.wav'
    },
    {
        name: 'turretPlace',
        path: 'TowerDefence/assets/sounds/effects/TurretPlace.wav'
    },
    {
        name: 'cannonShot',
        path: 'TowerDefence/assets/sounds/effects/CannonShot.wav'
    },
    {
        name: 'fastEnemyDeath',
        path: 'TowerDefence/assets/sounds/effects/FastEnemyDeath.wav'
    }
];

const turretData = [
    {
        name: "Tower Cannon 2",
        assetPath: 'TowerDefence/assets/models/turrets/RedBasicTurret.json',
        imagePath: '/api/towers/tower_cannon2.gif',
        reachDistance: 2,
        firingSpeed: 0.25,
        meshSize: 0.018,
        price: 40,
        type: 1,
        bulletData: {
            damage: 0.3,
            speed: 15,
            radius: 0.05,
            color: 0xedd326
        },
        soundEffects: [
            {
                action: 'shoot',
                name: 'turretShot2'
            },
            {
                action: 'place',
                name: 'turretPlace'
            }
        ]
    },
    {
        name: "Rapid Fire Turret",
        assetPath: 'TowerDefence/assets/models/turrets/RedBasicTurret.json',
        imagePath: 'TowerDefence/assets/images/turrets/RedTurretPreview.png',
        reachDistance: 1.75,
        firingSpeed: 0.05,
        price: 60,
        type: 1,
        bulletData: {
            damage: 0.1,
            speed: 10,
            radius: 0.035,
            color: 0xeb0909
        },
        soundEffects: [
            {
                action: 'shoot',
                name: 'turretShot2'
            },
            {
                action: 'place',
                name: 'turretPlace'
            }
        ]
    },
    {
        name: "High Damage Turret",
        assetPath: 'TowerDefence/assets/models/turrets/BlueBasicTurret.json',
        imagePath: 'TowerDefence/assets/images/turrets/BlueTurretPreview.png',
        reachDistance: 4,
        firingSpeed: 2,
        price: 100,
        type: 1,
        bulletData: {
            damage: 6,
            speed: 3,
            radius: 0.12,
            color: 0x000000
        },
        soundEffects: [
            {
                action: 'shoot',
                name: 'cannonShot'
            },
            {
                action: 'place',
                name: 'turretPlace'
            }
        ]
    }
];

const enemiesData = [
    {
        name: "basic",
        assetPath: '/bat.fbx',
        speed: 1,
        health: 10,
        meshSize: 0.02,
        money: 10,
        type: 0,
        soundEffects: [
            {
                action: 'death',
                name: 'enemyDeath'
            }
        ]
    },
    {
        name: "medium",
        assetPath: '/batblue.fbx',
        speed: 0.8,
        health: 20,
        meshSize: 0.02,
        money: 15,
        type: 0,
        soundEffects: [
            {
                action: 'death',
                name: 'enemyDeath'
            }
        ]
    },
    {
        name: "small",
        assetPath: '/carni3.fbx',
        speed: 1,
        health: 2,
        meshSize: 0.02,
        money: 6,
        type: 0,
        soundEffects: [
            {
                action: 'death',
                name: 'enemyDeath'
            }
        ]
    },
    {
        name: "fast",
        assetPath: 'TowerDefence/assets/models/enemies/mutant.fbx',
        speed: 1,
        health: 1,
        meshSize: 0.006,
        money: 8,
        type: 0,
        soundEffects: [
            {
                action: 'fastEnemyDeath',
                name: 'enemyDeath'
            }
        ]
    },
    {
        name: "large",
        assetPath: '/carni2.fbx',
        speed: 3,
        health: 80,
        meshSize: 0.02,

        money: 40,
        type: 0,
        soundEffects: [
            {
                action: 'death',
                name: 'enemyDeath'
            }
        ]
    },
]
