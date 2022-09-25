const { app, Menu, dialog, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");

const isMac = process.platform === "darwin";

const template = [

    // { role: 'editMenu' }
    /* {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" }
      ]
    }, */
    // { role: 'viewMenu' }
    /* {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "toggledevtools" },
        { type: "separator" },
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    }, */

    {
        label: "Screenshot",
        click: () => {
            const win = BrowserWindow.getFocusedWindow()
            win.webContents
                .capturePage({
                    x: 0,
                    y: 0,
                    width: 800,
                    height: 600,
                })
                .then((img) => {
                    dialog
                        .showSaveDialog({
                            title: "Select the File Path to save",

                            // Default path
                            defaultPath: path.join(__dirname,
                                "image.png"),

                            // defaultPath: path.join(__dirname, 
                            // './image.jpeg'),
                            buttonLabel: "Save",

                            // Restricting the user to only Image Files.
                            filters: [
                                {
                                    name: "Image Files",
                                    extensions: ["png", "jpeg", "jpg"],
                                },
                            ],
                            properties: [],
                        })
                        .then((file) => {
                            // Stating whether dialog operation was 
                            // cancelled or not.
                            console.log(file.canceled);
                            if (!file.canceled) {
                                console.log(file.filePath.toString());

                                // Creating and Writing to the image.png file
                                // Can save the File as a jpeg file as well,
                                // by simply using img.toJPEG(100);
                                fs.writeFile(file.filePath.toString(),
                                    img.toPNG(), "base64", function (err) {
                                        if (err) throw err;
                                        console.log("Saved!");
                                    });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    {
        type: "separator",
    },
    {
        label: "File",
        submenu: [isMac ? { role: "close" } : { role: "quit" }]
    },
    // { role: 'windowMenu' }
    {
        label: "Window",
        submenu: [{ role: "minimize" }, { role: "zoom" }]
    },
    {
        role: "help",
        submenu: [
            {
                label: "Learn More",
                click: async () => {
                    const { shell } = require("electron");
                    await shell.openExternal("https://electronjs.org");
                }
            }
        ]
    }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

module.exports = {
    menu
};