let gui;
let s_volume;

let img_speaker;
function init_gui_layout()
{
    gui = createGui();
    gui.loadStyle("Blue");  
    s_volume = createSlider("Slider", 35, 5, 200, 25, 0, 50);
    s_volume.val=50;
    img_speaker = loadImage('assets/speaker.png');
}
function gui_layout()
{
    drawGui();
    image(img_speaker,20, 20, 20, 20);
    if (s_volume.isChanged) {
        let volume = s_volume.val-50;
        bdrum.volume.value=volume;
        crash.volume.value=volume;
        hh_c.volume.value=volume;
        tom1.volume.value=volume;
        tom2.volume.value=volume;
        console.log(volume);
    }
}