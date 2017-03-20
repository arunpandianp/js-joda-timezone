
function getResolvedTimeZone() {
    if (Intl != null && Intl.DateTimeFormat != null) {
        const dateTimeFormat = Intl.DateTimeFormat();
        if (dateTimeFormat.resolvedOptions != null) {
            return dateTimeFormat.resolvedOptions().timeZone;
        }
    }
    return null;
}

export default function extendSystemDefaultZoneId(ZoneId) {
    const resolvedTimeZone = getResolvedTimeZone();

    if (resolvedTimeZone != null) {
        try {
            const systemDefaultZoneId = ZoneId.of(resolvedTimeZone);

            ZoneId.systemDefault = function () {
                return systemDefaultZoneId;
            };

        } catch (err) {
            // just swallow
        }
    }
}