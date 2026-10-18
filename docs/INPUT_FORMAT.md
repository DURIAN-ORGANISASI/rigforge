# Format Input Avatar

RigForge accepts plain-text avatar tokens and JSON data following the `AccessoryBlob Data:` marker. The parser searches the full input and is case-insensitive.

## Example

```text
Head: 12345
Torso: 23456
Pants: 34567
HairAccessory: 45678, 56789
Body Color: 242,215,205 (#F2D7CD)
```

## Recognized token groups

| Group | Token names |
| --- | --- |
| Body parts | `Head`, `Torso`, `LeftArm`, `RightArm`, `LeftLeg`, `RightLeg` |
| Classic clothing | `Pants`, `Shirt`, `TShirt`; `T-Shirt` and `Tshirt` are also recognized |
| Skin tone | `Body Color` with RGB values; a hex value in parentheses takes priority |
| Accessories | `Hat`, `HairAccessory`, `FaceAccessory`, `FrontAccessory`, `NeckAccessory`, `BackAccessory`, `ShoulderAccessory`, `WaistAccessory` |
| Accessory JSON | `AccessoryBlob Data:` followed by a JSON array of items using `AccessoryType` and `AssetId` |

If `DynamicHead` is present, its value replaces `Head`. Several accessory IDs may be comma-separated.

## Slot behavior

Minimum slot counts are maintained by the converter. Unused slots use `AssetId = 0`; IDs beyond the minimum add rows. Duplicate IDs within the same group are emitted once.

| Group | Minimum slots |
| --- | --- |
| `Clothes.Layered` | `LeftShoe` 2, `RightShoe` 2, `TShirt` 3, `Shirt` 3, `Pants` 3, `Shorts` 3, `DressSkirt` 3, `Sweater` 3, `Jacket` 4 |
| `Accessories` | `Hat` 3, `Hair` 3, `Face` 7, `Front` 3, `Neck` 3, `Back` 3, `Shoulder` 3, `Waist` 3 |

The list of groups is defined in `src/lib/converter.ts` through `LAYERED_GROUPS` and `ACCESSORY_GROUPS`. When JSON data contains invalid syntax, that blob is ignored; other input tokens can still be converted and details are written to the browser console.

## Review your output

The output is a generated Lua structure. Review it, then test it in Roblox Studio before using it in a project. RigForge does not upload the avatar input to its conversion server.
