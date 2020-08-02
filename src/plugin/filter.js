export default {
    fmtTime(val) {
        return new Date(val).getFormatText()
    },
    fmtGender(val) {
        return ['男', '女'][val]
    }
}