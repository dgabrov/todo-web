interface paragraph {
    level: number
    lines: string[]
}

interface line {
    level: number
    line: string
}


function consolidateLine(ln: string, quote: string): line {
    const prefixRegex = new RegExp(`^((${quote}\\s*)*)([^${quote}].*)$`)
    const bodyRegex = new RegExp(`^(${quote}\\s*)*(.*)$`)

    let prefix = ln.replace(prefixRegex, '$1')
    prefix = prefix.replace(/\s/g, "")

    const body = ln.replace(bodyRegex, '$2').trim()

    return {
        level: prefix.length,
        line: body
    }
}

const splitLines = (message: string, quote: string): line[] => {
    const lines = message.split("\n");

    const res = lines
        .map((line: string): line => {
            let ln = line.replace(/\r/g, "")

            // now, we try to consolidate the quote characters from the beginning
            return consolidateLine(ln, quote)
        });

    return res;
}

const isEmpty = (line: line) => {
    return line.line.trim().length === 0
}

const splitParagraphs = (lines: line[]): paragraph[] => {
    const res: paragraph[] = [];

    let current: paragraph | null = null;

    lines.forEach((ln: line) => {
        const level = ln.level;
        const currentText = ln.line;

        if (isEmpty(ln)) {
            if (current !== null && current.lines.length > 0) {
                res.push(current);

                current = {
                    level: level,
                    lines: []
                };
            }
        }
        else {
            if (current === null) {
                current = {
                    level: level,
                    lines: []
                };
            }
            else if (level !== current.level) {
                res.push(current);

                current = {
                    level: level,
                    lines: []
                };
            }

            current.lines.push(currentText);
        }

    })

    // don't forget the latest paragraph
    if (current != null) {
        res.push(current);
    }

    return res;
}

function wrapLine(line: string, maxLength: number) : string[]{
    const res: string[] = [];

    const words = line.split(/\s+/);
    let currentLine: string | null = null;

    words.forEach((word: string) => {
        if (currentLine === null) {
            currentLine = word
        }
        else {
            if (currentLine.length + word.length > maxLength) {
                res.push(currentLine);
                currentLine = word;
            }
            else {
                currentLine = currentLine + " " + word;
            }
        }
    });

    if (currentLine !== null) {
        res.push(currentLine!!);
    };

    return res;
}

const rewrapLines = (paragraphs: paragraph[], maxLength: number): paragraph[] => {
    return paragraphs.map((p: paragraph) => {
        let level = p.level;
        let bigLine = p.lines.join(" ").trim();

        let lines = wrapLine(bigLine, maxLength);

        return {level, lines}

    });
}

function processPrefix(level: number, quote: string, addQuote: boolean) : string {
    let nr = level
    if (addQuote) {
        nr++;
    }

    let res = "";

    if (nr > 0) {
        for (let i = 0; i < nr; i++) {
            res = res + quote;
        }

        res = res + " ";
    }

    return res;
}

function isEmptyParagraph(p: paragraph) {
    let filtered : string[] = p.lines.filter((line: string) => {
        return line.trim().length > 0
    })

    return filtered.length === 0
}

const processResult = (paragraphs: paragraph[], quote: string, addQuote: boolean, addEmptyLines: boolean): string[] => {
    const res: string[] = []

    paragraphs
        .filter((p:paragraph) => {
            return !isEmptyParagraph(p)
        })
        .forEach((p: paragraph) => {

            const prefix = processPrefix(p.level, quote, addQuote);

            p.lines.forEach((ln: string) => {
                res.push(prefix + ln.trim());
            });

            if (addEmptyLines) {
                res.push("");
            }
        });

    return res;
}

/**
 *
 * @param message the message that is being processed
 * @param maxLength maximum length of the lines being processed
 * @param quote the quote character, should be something like '>'
 * @param addQuote if true, will add quote to the result, if not, will not add this quote.
 * @param addEmptyLines if true, add empty lines between paragraphs when computing the result
 */
export const splitMessage = (message: string, maxLength: number, quote: string, addQuote: boolean, addEmptyLines: boolean): string[] => {
    const lines: line[] = splitLines(message, quote)

    let paragraphs: paragraph[] = splitParagraphs(lines)
    paragraphs = rewrapLines(paragraphs, maxLength)

    return processResult(paragraphs, quote, addQuote, addEmptyLines)
}
