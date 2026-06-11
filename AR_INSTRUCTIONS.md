AR Preview / Quick Look Integration

Summary
- This project already includes an `ARViewer` component powered by `@google/model-viewer`.
- Flow: scan QR -> open website -> select dish -> tap "View in AR" -> model-viewer opens -> tap AR icon -> place in space.

Steps to add your GLB files and enable AR:

1) Put model files in `public/models/`
   - The project already includes sample placeholder files in `public/models/`.
   - Copy your `.glb` files there to replace or extend the sample models.
   - Example: `public/models/margherita.glb`.

2) (Optional but recommended for iOS Quick Look) Create USDZ files
   - For iOS Quick Look, create a `.usdz` file with the same basename as the `.glb` (e.g. `margherita.usdz`) and place it next to the GLB in `public/models`.
   - Use Apple's Reality Converter (macOS), or an online USDZ conversion service, or `usdzconvert` if you have a toolchain. The project does not auto-convert.

3) Update the dish model paths
   - Open `src/data/menu.ts` and change the `model` property for each dish to point to the public path, e.g.
     - `model: "/models/margherita.glb"`
   - If you created `margherita.usdz`, the app will automatically set `ios-src` to `/models/margherita.usdz` so iOS Quick Look can be used.

4) Test locally
   - Start the dev server (you already ran `npm run dev`).
   - Visit `http://localhost:8080/` on your desktop to preview the UI.
   - On a mobile device connected to the same network, open the network URL printed by Vite (e.g. `http://192.168.43.203:8080/`).

5) Using QR codes (to jump from a table QR to the AR page)
   - Generate a QR code that points to the dish detail or to the index page. Example quick generator:

```
https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://your-host.example.com/
```

   - Place the QR at the table. Scanning opens the website; users can tap a dish and select "View in AR".

6) Notes & Troubleshooting
   - Android: Scene Viewer should open for GLB, provided the device supports WebXR/Scene Viewer. Using `ar-modes="webxr scene-viewer quick-look"` covers most cases.
   - iOS: Quick Look requires `.usdz`. If `ios-src` points to a file that doesn't exist, Quick Look won't launch.
   - CORS: Host model files from the same origin (public folder) or a CORS-enabled CDN.
   - File sizes: Optimize GLB files for mobile (draco compression, lower texture sizes).

7) Optional improvements
   - Pre-generate thumbnails for menu cards to preview the model.
   - Provide a server-side USDZ conversion pipeline (requires external tooling).
   - Generate per-dish shareable deep links and QR codes automatically.

If you'd like, I can:
- Add a `public/models/` folder and update a few dishes in `src/data/menu.ts` to point to sample GLB filenames.
- Add a small utility route to generate QR images for each dish.
- Add conversion guidance scripts (macOS-only) to batch-create USDZ files.

Tell me which of the above you'd like me to implement next.
