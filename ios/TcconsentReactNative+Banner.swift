import TCConsent

/**
 * Parses the JS-side `showBanner()` arguments (options + colorScheme dictionaries) into the
 * native TCBannerOptions / TCBannerTheme types. Kept in its own file so the main bridge file
 * only has to carry `showBanner()` itself.
 */
extension TcconsentReactNative
{
    /**
     * Parses the optional JS `colorScheme` — { light: { background, textColor }, dark: { background, textColor } }
     * with hex colour strings (with or without a leading '#') — into a native TCBannerTheme.
     * Returns nil (native/asset-catalogue defaults) if the dictionary is missing or malformed.
     */
    func evaluateBannerTheme(_ colorScheme: NSDictionary?) -> TCBannerTheme?
    {
        guard let colorScheme = colorScheme,
              let light = colorScheme["light"] as? NSDictionary,
              let dark = colorScheme["dark"] as? NSDictionary,
              let lightBackgroundHex = light["background"] as? String,
              let lightTextColorHex = light["textColor"] as? String,
              let darkBackgroundHex = dark["background"] as? String,
              let darkTextColorHex = dark["textColor"] as? String,
              let lightBackground = evaluateColor(hex: lightBackgroundHex),
              let lightTextColor = evaluateColor(hex: lightTextColorHex),
              let darkBackground = evaluateColor(hex: darkBackgroundHex),
              let darkTextColor = evaluateColor(hex: darkTextColorHex)
        else
        {
            return nil
        }

        return TCBannerTheme(
            lightColours: TCBannerColours(background: lightBackground, textColor: lightTextColor),
            darkColours: TCBannerColours(background: darkBackground, textColor: darkTextColor)
        )
    }

    /** Accepts hex colours with or without a leading '#' (e.g. '#FFFFFF' or 'FFFFFF'), 6 or 8 hex digits. */
    func evaluateColor(hex: String) -> UIColor?
    {
        var cleanHex = hex.trimmingCharacters(in: .whitespacesAndNewlines)

        if cleanHex.hasPrefix("#")
        {
            cleanHex.removeFirst()
        }

        guard cleanHex.count == 6 || cleanHex.count == 8, let hexValue = UInt64(cleanHex, radix: 16) else
        {
            return nil
        }

        if cleanHex.count == 8
        {
            let r = CGFloat((hexValue & 0xFF000000) >> 24) / 255
            let g = CGFloat((hexValue & 0x00FF0000) >> 16) / 255
            let b = CGFloat((hexValue & 0x0000FF00) >> 8) / 255
            let a = CGFloat(hexValue & 0x000000FF) / 255
            return UIColor(red: r, green: g, blue: b, alpha: a)
        }
        else
        {
            let r = CGFloat((hexValue & 0xFF0000) >> 16) / 255
            let g = CGFloat((hexValue & 0x00FF00) >> 8) / 255
            let b = CGFloat(hexValue & 0x0000FF) / 255
            return UIColor(red: r, green: g, blue: b, alpha: 1.0)
        }
    }

    func evaluateBannerOptions(_ options: NSDictionary?) -> TCBannerOptions
    {
        var bannerOptions = TCBannerOptions()

        guard let options = options else { return bannerOptions }

        if let dimAmount = options["dimAmount"] as? CGFloat
        {
            bannerOptions.dimAmount = dimAmount
        }
        if let isDismissible = options["isDismissible"] as? Bool
        {
            bannerOptions.isDismissible = isDismissible
        }
        if let iconName = options["iconName"] as? String
        {
            bannerOptions.iconName = iconName
        }
        if let iconSize = options["iconSize"] as? CGFloat
        {
            bannerOptions.iconSize = iconSize
        }
        if let buttonsAlignment = options["buttonsAlignment"] as? String
        {
            bannerOptions.buttonsAlignment = (buttonsAlignment == "horizontal") ? .horizontal : .vertical
        }
        if let buttonsOrder = options["buttonsOrder"] as? [String]
        {
            bannerOptions.buttonsOrder = buttonsOrder.compactMap { evaluateBannerButton(stringButton: $0) }
        }
        if let compactLayout = options["compactLayout"] as? Bool
        {
            bannerOptions.compactLayout = compactLayout
        }

        return bannerOptions
    }

    func evaluateBannerButton(stringButton: String) -> TCBannerButton?
    {
        switch stringButton
        {
            case "accept": return .accept
            case "refuse": return .refuse
            case "details": return .details
            default: return nil
        }
    }
}
