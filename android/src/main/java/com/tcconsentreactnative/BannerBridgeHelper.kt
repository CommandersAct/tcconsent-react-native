package com.tcconsentreactnative

import android.app.Activity
import android.graphics.Color
import android.util.Log
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.ui.graphics.Color as ComposeColor
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.tagcommander.lib.consent.TCBannerButtonOrder
import com.tagcommander.lib.consent.TCBannerOptions
import com.tagcommander.lib.consent.TCBannerTheme
import com.tagcommander.lib.consent.TCButtonsAlignment
import com.tagcommander.lib.consent.TCConsent
import com.tagcommander.lib.consent.showBanner
import com.tagcommander.lib.consent.ui.TCBannerType
import com.tagcommander.lib.core.TCLogger

/**
 * Bridges `showBanner()` from JS into the native Kotlin API: TcconsentReactNativeModule.java only
 * extracts the raw JS values (activity, type, options, colorScheme) and forwards them here, so the
 * actual call into TCConsent's showBanner() - and the TCBannerOptions / TCBannerTheme construction
 * it needs - happens with normal Kotlin calling conventions (default args, trailing lambda) rather
 * than Java's Function0/Unit boilerplate. Kept as Kotlin because TCBannerTheme wraps a full Compose
 * Material3 ColorScheme, which Java can't construct directly - the rest of the bridge module stays
 * plain Java.
 */
object BannerBridgeHelper
{
    @JvmStatic
    fun showBanner(activity: Activity?, type: String?, options: ReadableMap?, colorScheme: ReadableMap?, onDetailsButtonClick: Runnable)
    {
        if (activity !is FragmentActivity)
        {
            TCLogger.getInstance().logMessage("Cannot show banner: no FragmentActivity available. Make sure showBanner() is called while your app is in the foreground.", Log.ERROR)
            return
        }

        val bannerType = if (type == "fullScreen") TCBannerType.FULL_SCREEN else TCBannerType.BOTTOM_SHEET

        TCConsent.getInstance().showBanner(
            activity = activity,
            onDetailsButtonClick = { onDetailsButtonClick.run() },
            type = bannerType,
            options = evaluateBannerOptions(options),
            bannerTheme = evaluateBannerTheme(colorScheme)
        )
    }

    /**
     * Parses the optional JS `colorScheme` — { light: { background, textColor }, dark: { background, textColor } }
     * with hex colour strings (with or without a leading '#') — into a native TCBannerTheme.
     */
    private fun evaluateBannerTheme(colorScheme: ReadableMap?): TCBannerTheme?
    {
        if (colorScheme == null || !colorScheme.hasKey("light") || !colorScheme.hasKey("dark"))
        {
            return null
        }

        val light = colorScheme.getMap("light")
        val dark = colorScheme.getMap("dark")

        if (light == null || dark == null
            || !light.hasKey("background") || light.isNull("background")
            || !light.hasKey("textColor") || light.isNull("textColor")
            || !dark.hasKey("background") || dark.isNull("background")
            || !dark.hasKey("textColor") || dark.isNull("textColor"))
        {
            TCLogger.getInstance().logMessage("Ignoring colorScheme: expected { light: { background, textColor }, dark: { background, textColor } } with hex colour strings.", Log.WARN)
            return null
        }

        val lightBackground = parseHexColor(light.getString("background")!!)
        val lightTextColor = parseHexColor(light.getString("textColor")!!)
        val darkBackground = parseHexColor(dark.getString("background")!!)
        val darkTextColor = parseHexColor(dark.getString("textColor")!!)

        return TCBannerTheme(
            lightColorScheme(surface = ComposeColor(lightBackground), onSurface = ComposeColor(lightTextColor)),
            darkColorScheme(surface = ComposeColor(darkBackground), onSurface = ComposeColor(darkTextColor))
        )
    }

    /** Accepts hex colours with or without a leading '#' (e.g. '#FFFFFF' or 'FFFFFF'). */
    private fun parseHexColor(hex: String): Int
    {
        return Color.parseColor(if (hex.startsWith("#")) hex else "#$hex")
    }

    private fun evaluateBannerOptions(options: ReadableMap?): TCBannerOptions
    {
        var dimAmount = 0.4f
        var isDismissible = false
        var iconName: String? = null
        var iconSize = 50
        var buttonsAlignment = TCButtonsAlignment.VERTICAL
        var buttonsOrder = listOf(TCBannerButtonOrder.REFUSE, TCBannerButtonOrder.DETAILS, TCBannerButtonOrder.ACCEPT)
        var compactLayout = false

        if (options != null)
        {
            if (options.hasKey("dimAmount") && !options.isNull("dimAmount"))
            {
                dimAmount = options.getDouble("dimAmount").toFloat()
            }
            if (options.hasKey("isDismissible") && !options.isNull("isDismissible"))
            {
                isDismissible = options.getBoolean("isDismissible")
            }
            if (options.hasKey("iconName") && !options.isNull("iconName"))
            {
                iconName = options.getString("iconName")
            }
            if (options.hasKey("iconSize") && !options.isNull("iconSize"))
            {
                iconSize = options.getDouble("iconSize").toInt()
            }
            if (options.hasKey("buttonsAlignment") && !options.isNull("buttonsAlignment"))
            {
                buttonsAlignment = if (options.getString("buttonsAlignment") == "horizontal") TCButtonsAlignment.HORIZONTAL else TCButtonsAlignment.VERTICAL
            }
            if (options.hasKey("buttonsOrder") && !options.isNull("buttonsOrder"))
            {
                val order: ReadableArray = options.getArray("buttonsOrder")!!
                buttonsOrder = (0 until order.size()).map { evaluateBannerButton(order.getString(it) ?: "") }
            }
            if (options.hasKey("compactLayout") && !options.isNull("compactLayout"))
            {
                compactLayout = options.getBoolean("compactLayout")
            }
        }

        return TCBannerOptions(dimAmount, isDismissible, iconName, iconSize, buttonsAlignment, buttonsOrder, compactLayout)
    }

    private fun evaluateBannerButton(button: String): TCBannerButtonOrder
    {
        return when (button)
        {
            "accept" -> TCBannerButtonOrder.ACCEPT
            "details" -> TCBannerButtonOrder.DETAILS
            else -> TCBannerButtonOrder.REFUSE
        }
    }
}
