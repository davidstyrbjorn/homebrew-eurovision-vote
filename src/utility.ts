
function toStringWithZeroPadding(value: number) {
    return (value < 10 ? "0" : "") + value.toString();
}

export { toStringWithZeroPadding };
