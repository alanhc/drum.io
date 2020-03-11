
# drum.io
[![Landing:Planet](http://img.youtube.com/vi/82d7E0uENcg/0.jpg)](https://youtu.be/82d7E0uENcg)

## 說明你做了什麼
學javascript es6的語法規則、p5.js與processing的不同，了解socket網路通訊程式原理，
花最多時間在多人連線的部分，需要畫出狀態圖及流程圖，與一般程式思考邏輯不太一樣
分為host與play兩個階段，當某個client在host階段 其他就負責檢查是否有與打一樣，有點像請你跟我這樣做
再花點時間debug
深度學習是否要多層訓練比較好等等

## 如何操作
1. 將瀏覽器的自動播放功能打開 設定 進階設定 隱私 音效 允許 {server ip}
2. 參照p5.js serial library 先將整個repository clone下來，npm install，node startServer.js（照著網頁guide做 
3. 將gm.js裡的192.168.1.109改成您的ip位址
4. 將serial.js裡 /dev/ttyACM0 改成您的Arduino 101位址
5. 進資料夾，在小黑下 npm run start（必須有nodejs在電腦上
6. 接上開發版即可開始玩

## 賣點是什麼
* 可以多人遊玩
* 深度學習訓練自己的Air drum
* 可以連線戰鬥

## 困難點是什麼
* 多人連線（寫好協定讓彼此可以跑一樣的視窗及不會打架 使用nodejs socket io
* 機器學習（訓練使準確率提升 ml5 library (base on tensorflow js)
* 互動裝置（Arduino及三軸感測器...
* 即時戰況表

由於此project有點小複雜，若裝置不能動有可能是p5.serial 沒有設定好，請參照 https://github.com/vanevery/p5.serialport
但由於p5.serial 與此專案一起使用時，同步會受到影響，因此我已將此連線功能拿掉，若要嘗試請使用


serial連線 https://editor.p5js.org/alanhc/sketches/ILrZMsoO7
深度學習訓練 https://editor.p5js.org/alanhc/sketches/FmNlDsPjv     
KNN訓練及測試 https://editor.p5js.org/alanhc/sketches/Zhxob2BQa
介面調整及測試 https://editor.p5js.org/alanhc/sketches/Tpc-lw1Xi
