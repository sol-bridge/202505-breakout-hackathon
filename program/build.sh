#!/bin/bash

# Install Rust if not already installed
if ! command -v rustc &> /dev/null; then
    echo "Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    source $HOME/.cargo/env
fi

# Install Solana CLI tools if not already installed
if ! command -v solana &> /dev/null; then
    echo "Installing Solana CLI tools..."
    sh -c "$(curl -sSfL https://release.solana.com/v1.16.0/install)"
    export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
fi

# Add Solana to PATH for this session
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"

# Install BPF tools
cargo install --git https://github.com/solana-labs/cargo-build-bpf

# Set Solana to devnet
solana config set --url devnet

# Build the program
cargo build-bpf --manifest-path=./Cargo.toml --bpf-out-dir=./target/deploy

echo "Build complete! Program binary is at ./target/deploy/solbridge_rewards.so"