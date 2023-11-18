This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prepare App

```bash
#after
npm install
#deploy the app with
npm run build
```

copy the build folder to your server

## Prepare Raspberry Pi 3

First install and update your raspberry and install xscreensaver

```bash
sudo apt update

sudo apt full-upgrade

sudo apt clean
#or in newer versions
sudo apt-get clean

sudo apt install xscreensaver
```

under preferences -> screensaver disable your screensaver

then copy the folder `picture-frame-startup` to your raspberry home directory

Now create a autostart file with

```bash
sudo nano /home/raspberry/.config/lxsession/LXDE-pi/autostart
```

In this file write the code from below Sreenshot

These commands open the terminal and start chromium with fullscreen without crash report (chromium 116). Instead of `google.com` insert your url or ip from server `192.168.x.x/picture-frame` with the baseUrl from `next.config.js`

![alt text](https://github.com/Sp1r1tus/picture-frame/blob/main/picture-frame-startup/raspberry_autostart.png?raw=true)

After that open your bashrc file with following command:

```bash
sudo nano /home/raspberry/.bashrc
```

go to the last line and add these 2 lines

![alt text](https://github.com/Sp1r1tus/picture-frame/blob/main/picture-frame-startup/config_bash.png?raw=true)

at last remove your mouse cursor from display manager with the following command

```bash
sudo nano /etc/lightdm/lightdm.conf
```

then go to the line [Seat:*] and add the following command shown in the Screenshot

![alt text](https://github.com/Sp1r1tus/picture-frame/blob/main/picture-frame-startup/display_manager.png?raw=true)

reboot your raspberry and your digital picture frame is ready
