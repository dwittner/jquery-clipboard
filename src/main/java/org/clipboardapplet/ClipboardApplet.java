package org.clipboardapplet;

import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.StringSelection;
import java.security.AccessController;
import java.security.PrivilegedAction;

import javax.swing.JApplet;

/**
 * jquery-clipboard
 *
 * (c) 2014 Daniel Wittner <d.wittner@gmx.de>
 */
public class ClipboardApplet extends JApplet {

	private static final long serialVersionUID = -244488238381456407L;

	public void writeToClipboard(final String text) {

		System.out.println("writeToClipboard: " + text);

		AccessController.doPrivileged(new PrivilegedAction<Object>() {

			public Object run() {

				try {
					final StringSelection stringSelection = new StringSelection(text);
					final Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
					clipboard.setContents(stringSelection, stringSelection);
				} catch (Exception e) {
					e.printStackTrace();
					throw new RuntimeException(e);
				}

				return null;
			}
		});

	}

	public String readFromClipboard() {

		System.out.print("readFromClipboard: ");

		return (String) AccessController.doPrivileged(new PrivilegedAction<Object>() {

			public String run() {

				String text = null;
				try {
					final Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
					text = (String) clipboard.getContents(null).getTransferData(DataFlavor.stringFlavor);
				} catch (Exception e) {
					e.printStackTrace();
					throw new RuntimeException(e);
				}

				System.out.println(text);

				return text;
			}
		});

	}
}
